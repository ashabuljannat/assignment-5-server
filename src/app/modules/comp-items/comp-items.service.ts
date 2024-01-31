/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { compItemExcludeFilteringFields, pagination } from './comp-item.utils';
import { CompItem } from './comp-items.model';
import { TComputerItem, TMeta } from './comp-items.interface';
import { Types } from 'mongoose';
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';

const createCompItemIntoDB = async (payload: TComputerItem) => {
  const result = await CompItem.create(payload);
  return result;
};

const getAllCompItemFromDB = async (reqQuery: any) => {
  const queryObj = { ...reqQuery };
  compItemExcludeFilteringFields.forEach((el) => delete queryObj[el]);

  const queryPage = Number(reqQuery.page) || 1;
  const queryLimit = Number(reqQuery.limit) || 10;

  const { sortBy, sortOrder } = reqQuery;
  const sort: any = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  }

  const { maxPrice: queryMaxPrice, minPrice: queryMinPrice } = reqQuery;
  if (queryMaxPrice || queryMinPrice) {
    const queryResult = await CompItem.find({
      $and: [
        { price: { $gte: queryMinPrice } },
        { price: { $lte: queryMaxPrice } },
      ],
    }).sort(sort);

    const { allPageData, totalPages } = pagination(queryResult, queryLimit);
    const meta: TMeta = {
      page: totalPages,
      limit: queryLimit,
      total: queryResult.length,
    };

    const result = allPageData[queryPage - 1];
    return { meta, result };
  }

  const queryResult = await CompItem.find(queryObj).sort(sort);

  const { allPageData, totalPages } = pagination(queryResult, queryLimit);
  const meta: TMeta = {
    page: totalPages,
    limit: queryLimit,
    total: queryResult.length,
  };

  const result = allPageData[queryPage - 1];
  return { meta, result };
};

// const deleteCompItemFromDB = async (id: string, ids: string[]) => {
const deleteCompItemFromDB = async (ids: string[]) => {
  // if ((await CompItem.find({ _id: id })).length < 1) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Computer item not found');
  // }

  const result = await CompItem.deleteMany({
    _id: { $in: ids?.map((id) => new Types.ObjectId(id)) },
  });

  // const result = await CompItem.findByIdAndDelete(id);
  return result;
};

const updateCompItemIntoDB = async (
  id: string,
  payload: Partial<TComputerItem>,
) => {
  const isItemExist: any = await CompItem.findOne({ _id: id });
  if (!isItemExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Computer Item not found');
  }

  const {
    compatibility,
    interface: interfaceItem,
    ...itemRemainingData
  } = payload;

  try {
    const updatedBasicItemInfo = await CompItem.findByIdAndUpdate(
      id,
      itemRemainingData,
      { new: true, runValidators: true },
    );
    if (!updatedBasicItemInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update Computer Item',
      );
    }

    if (compatibility && compatibility.length > 0) {
      const updateCompatibility = await CompItem.findByIdAndUpdate(
        id,
        { $set: { compatibility } },
        { new: true, runValidators: true },
      );

      if (!updateCompatibility) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update computer item',
        );
      }
    }

    if (interfaceItem && interfaceItem.length > 0) {
      const updateInterface = await CompItem.findByIdAndUpdate(
        id,
        { $set: { interface: interfaceItem } },
        { new: true, runValidators: true },
      );

      if (!updateInterface) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update computer item',
        );
      }
    }

    const result = await CompItem.findById(id);
    return result;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Catch Failed to update course');
  }
};

export const CompServices = {
  createCompItemIntoDB,
  getAllCompItemFromDB,
  deleteCompItemFromDB,
  updateCompItemIntoDB,
};
