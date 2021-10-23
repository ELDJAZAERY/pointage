import EmployeService from "../../../src/features/Employe/employe.service";
import { EmployeCreateionDTO, MockedEmploye } from "./__mocks__/data/emploies";
import {
  checkInFunc,
  checkInOutDTO,
  CheckoutFunc,
  getLastCheckIn,
  getLastCheckIn_withiCheckout,
  getLastCheckIn_withinIgnoreDelay,
  getLastCheckOut,
  getLastCheckOut_withinIgnoreDelay,
  MockPointage,
} from "./__mocks__/data/pointages";

import MockDate from "mockdate";

/**
 * utilisé une date mocked
 *   à l'envirement de test
 */
MockDate.set(new Date("2021-10-23T10:00:00.000Z"));

/**
 * Mock l'Employe manager
 *
 *  pour mocker la communication avec la DB
 *
 */
jest.mock(
  "../../../src/features/Employe/models/employe/employe.manager",
  () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          create: jest.fn(() => MockedEmploye()),
          list: jest.fn(() => ({
            items: [MockedEmploye()],
            count: 1,
            page: 1,
            totalPages: 1,
          })),
          find: jest.fn(() => MockedEmploye()),
        };
      }),
    };
  }
);

/**
 * Mock le Pointage manager
 *
 *  pour mocker la communication avec la DB
 *
 */

jest.mock(
  "../../../src/features/Employe/models/pointage/pointage.manager",
  () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          create: jest.fn(() => MockPointage()),
          getLastCheckIn: jest.fn(() => getLastCheckIn()),
          getLastCheckOut: jest.fn(() => getLastCheckOut()),
          list: jest.fn(() => ({
            items: [MockPointage()],
            count: 1,
            page: 1,
            totalPages: 1,
          })),
        };
      }),
    };
  }
);

/*
 * Les tests units & integration pour tester la logique dans
 *  notre couche métier 'Employe service'
 */
describe(" -- ### Employe service ### ", () => {
  /**
   * Tester la Créateion et la liste des Employés
   */
  describe(" -- ### Créatoin et lister d'Employés ###", () => {
    it("tester la création d'employe", async () => {
      let employe = null;
      try {
        employe = await EmployeService.createEmploye(EmployeCreateionDTO);
      } catch {}
      expect(employe?.id).not.toBeNull();
      expect(employe?.name).toEqual(EmployeCreateionDTO.name);
      expect(employe?.firstName).toEqual(EmployeCreateionDTO.firstName);
      expect(employe?.department).toEqual(EmployeCreateionDTO.department);
    });

    it("list d'employe", async () => {
      let employes = null;
      try {
        employes = await EmployeService.listeEmployes({});
      } catch {}
      expect(employes).not.toBeNull();
      expect(employes?.items?.length).toBeGreaterThan(0);
    });
  });

  /**
   * Tester la logique du pointage , check-in, check-out
   */
  describe(" -- ### Pointage, check-in et le check-out ###", () => {
    it("tester le check-in", async () => {
      let pointage = null;
      try {
        pointage = await EmployeService.checkIn(checkInOutDTO);
      } catch {}
      expect(pointage).not.toBeNull();
      expect(checkInFunc).toBeCalled();
    });

    it("tester le check-in si le lastCheckin est avant de moins d'une minute", async () => {
      let pointage = null;

      getLastCheckIn.mockImplementationOnce(getLastCheckIn_withinIgnoreDelay);

      try {
        pointage = await EmployeService.checkIn(checkInOutDTO);
      } catch {}

      expect(pointage).not.toBeNull();

      getLastCheckIn.mockImplementationOnce(getLastCheckIn_withinIgnoreDelay);
      const lastCheckin = getLastCheckIn();

      expect(pointage?.check_in).toEqual(lastCheckin?.check_in);
    });

    it("tester l'échec de check-in", async () => {
      let pointage = null;

      getLastCheckIn.mockImplementationOnce(() => Promise.reject());

      try {
        pointage = await EmployeService.checkIn(checkInOutDTO);
      } catch {}

      expect(pointage).toBeNull();
    });

    it("tester le check-out", async () => {
      getLastCheckIn.mockImplementationOnce(getLastCheckIn_withinIgnoreDelay);
      let pointage = null;
      try {
        pointage = await EmployeService.checkOut(checkInOutDTO);
      } catch {}
      expect(pointage).not.toBeNull();
      expect(CheckoutFunc).toBeCalled();
    });

    it("tester le check-out si le lastCheckOut est avant de moins d'une minute", async () => {
      let pointage = null;

      getLastCheckOut.mockImplementationOnce(getLastCheckOut_withinIgnoreDelay);

      try {
        pointage = await EmployeService.checkOut(checkInOutDTO);
      } catch {}

      expect(pointage).not.toBeNull();

      getLastCheckOut.mockImplementationOnce(getLastCheckOut_withinIgnoreDelay);
      const lastCheckOut = getLastCheckOut();

      expect(pointage?.check_out).toEqual(lastCheckOut?.check_out);
    });

    it("tester l'échec de check-out", async () => {
      let pointage = null;

      getLastCheckOut.mockImplementationOnce(() => Promise.reject());

      try {
        pointage = await EmployeService.checkOut(checkInOutDTO);
      } catch {}

      expect(pointage).toBeNull();
    });

    it("tester le check-out si l'employe ne se checker-in", async () => {
      let pointage = null;
      try {
        pointage = await EmployeService.checkOut(checkInOutDTO);
      } catch {}

      expect(pointage).not.toBeNull();
    });

    it("l'employe a deja check-out ", async () => {

      getLastCheckIn.mockImplementationOnce(getLastCheckIn_withiCheckout);
      
      let pointage = null;
      try {
        pointage = await EmployeService.checkOut(checkInOutDTO);
      } catch {}

      expect(pointage).not.toBeNull();
    });

    it("list d'employe", async () => {
      let employes = null;
      try {
        employes = await EmployeService.listeEmployes({});
      } catch {}
      expect(employes).not.toBeNull();
      expect(employes?.items?.length).toBeGreaterThan(0);
    });

    it("list toutes les pointages d'un Employe", async () => {
      let pointages = null;
      try {
        pointages = await EmployeService.listEmployePointages({
          employeID: MockedEmploye().id,
        });
      } catch {}
      expect(pointages).not.toBeNull();
      expect(pointages?.items?.length).toBeGreaterThan(0);
    });
  });
});
