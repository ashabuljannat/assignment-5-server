export type TComputerItem = {
    name: string;
    price: number;
    quantity: number;
    category: string;
    brand: string;
    compatibility: string[];
    interface: string[] | null; 
    condition: "new" | "used";
    capacity: string | null; 
    color: string;  
};

export type TMeta = {
    page: number;
    limit: number;
    total: number;
  };


