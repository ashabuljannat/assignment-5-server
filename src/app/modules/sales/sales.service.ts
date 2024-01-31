/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TSales } from './sales.interface';
import { Sales } from './sales.model';
import { TMeta } from '../course/course.interface';
import { compItemExcludeFilteringFields, pagination } from '../comp-items/comp-item.utils';

const createSalesIntoDB = async (payload: TSales) => {
  const result = await Sales.create(payload);
  return result;
};

const getAllSalesFromDB = async (reqQuery: any) => {
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
    const queryResult = await Sales.find({
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

  const queryResult = await Sales.find(queryObj).sort(sort);

  const { allPageData, totalPages } = pagination(queryResult, queryLimit);
  const meta: TMeta = {
    page: totalPages,
    limit: queryLimit,
    total: queryResult.length,
  };

  const result = allPageData[queryPage - 1];
  return { meta, result };
};

const deleteSalesFromDB = async (id: string) => {
  if ((await Sales.find({ _id: id })).length < 1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sales not found');
  }
  const result = await Sales.findByIdAndDelete(id);
  return result;
};

export const SalesServices = {
  createSalesIntoDB,
  getAllSalesFromDB,
  deleteSalesFromDB,
};
