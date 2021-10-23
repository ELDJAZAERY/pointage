import { CreateEmployeDTO, Employe } from "../../../../../src/features/Employe";

export const EmployeCreateionDTO: CreateEmployeDTO = {
  name: "Chee",
  firstName: "Diane",
  department: "IT",
};

export const MockedEmploye = jest.fn(
  (): Employe => ({
    name: "Chee",
    firstName: "Diane",
    department: "IT",
    id: "6ea7211b-1965-42d6-b5f8-21a34a690e6d",
    creationDate: new Date("2021-10-23T09:33:50.236Z"),
    lastUpdate: new Date("2021-10-23T09:33:50.236Z"),
    pointages: [],
    hasId: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    softRemove: jest.fn(),
    recover: jest.fn(),
    reload: jest.fn(),
  })
);

