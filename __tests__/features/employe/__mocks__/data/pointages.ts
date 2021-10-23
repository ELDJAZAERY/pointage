import CheckInOutDTO from "../../../../../src/features/Employe/dto/checkin.dto";
import Pointage from "../../../../../src/features/Employe/models/pointage/pointage.entity";
import { MockedEmploye } from "./emploies";

export const checkInOutDTO: CheckInOutDTO = {
  employeID: "6ea7211b-1965-42d6-b5f8-21a34a690e6d",
  comment: "partir en courte mission entre 13h et 15h",
};

export const checkInDate = jest.fn();
export const checkOutDate = jest.fn();
export const commentValue = jest.fn();

export const checkInFunc = jest.fn((comment: string) => {
  checkInDate.mockReturnValue(new Date("2021-10-23T10:02:30.869Z"));
  commentValue.mockReturnValue(comment);
  return Promise.resolve(MockPointage());
});

export const CheckoutFunc = jest.fn((comment: string) => {
  checkOutDate.mockReturnValue(new Date("2021-10-23T18:06:35.413Z"));
  commentValue.mockReturnValue(comment);
  return Promise.resolve(MockPointage());
});

export const getLastCheckIn = jest.fn(() => getLastCheckIn_undefiend());

export const getLastCheckIn_undefiend = jest.fn();

export const getLastCheckIn_withinIgnoreDelay = jest.fn(() => {
  const pointage = MockPointage();
  pointage.check_in = new Date();

  return pointage;
});

export const getLastCheckIn_withiCheckout = jest.fn(() => {
  const pointage = MockPointage();
  pointage.check_in = new Date();
  pointage.check_out = new Date();
  
  return pointage;
});

export const getLastCheckOut = jest.fn(() => getLastCheckIn_undefiend());

export const getLastCheckOut_undefiend = jest.fn();

export const getLastCheckOut_withinIgnoreDelay = jest.fn(() => {
  const pointage = MockPointage();
  pointage.check_out = new Date();

  return pointage;
});

export const MockPointage = jest.fn(
  (): Pointage => ({
    id: "8343e780-2c40-498f-b4e4-da18fe454ef8",
    employe: MockedEmploye(),
    check_in: checkInDate(),
    check_out: checkOutDate(),
    checkIn: checkInFunc,
    checkOut: CheckoutFunc,
    creationDate: new Date("2021-10-23T10:02:30.859Z"),
    lastUpdate: new Date("2021-10-23T10:02:30.878Z"),
    comment: commentValue(),
    duration: "",
    hasId: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    softRemove: jest.fn(),
    recover: jest.fn(),
    reload: jest.fn(),
  })
);
