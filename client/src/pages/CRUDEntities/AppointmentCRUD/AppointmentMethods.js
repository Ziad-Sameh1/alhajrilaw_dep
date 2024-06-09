import {
  addAppointment,
  updateAppointment,
  getAppointments,
  getAppointmentsByName,
  getAppointmentsStats,
  deleteAppointment,
  deleteAllAppointments,
} from "../../../services/AppointmentService";

export const GetAppointments = async (entitySetter, size, num, t) => {
  console.log(`size: ${size}, num: ${num}`);
  const res = await getAppointments(size, num, t);
  entitySetter(res);
};

export const GetAppointmentsStats = async (numericSetter, graphSetter, t) => {
  const res = await getAppointmentsStats(t);
  numericSetter({ all: res.all, month: res.month, day: res.day });
  const graph = [
    {
      name: t("january"),
      appointments: res.monthly[0],
    },
    {
      name: t("february"),
      appointments: res.monthly[1],
    },
    {
      name: t("march"),
      appointments: res.monthly[2],
    },
    {
      name: t("april"),
      appointments: res.monthly[3],
    },
    {
      name: t("may"),
      appointments: res.monthly[4],
    },
    {
      name: t("june"),
      appointments: res.monthly[5],
    },
    {
      name: t("july"),
      appointments: res.monthly[6],
    },
    {
      name: t("august"),
      appointments: res.monthly[7],
    },
    {
      name: t("september"),
      appointments: res.monthly[8],
    },
    {
      name: t("october"),
      appointments: res.monthly[9],
    },
    {
      name: t("november"),
      appointments: res.monthly[10],
    },
    {
      name: t("december"),
      appointments: res.monthly[11],
    },
  ];
  graphSetter(graph);
};

export const GetAppointmentsByName = async (
  entitySetter,
  searchFieldSetter,
  name,
  t
) => {
  searchFieldSetter(name);
  const res = await getAppointmentsByName(name, t);
  entitySetter(res);
};

export const AddAppointments = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await addAppointment(item, t);
  await GetAppointments(entitySetter, size, num, t);
  await GetAppointmentsStats(numericSetter, graphSetter, t);
};

export const UpdateAppointments = async (item, entitySetter, size, num, t) => {
  await updateAppointment(item, t);
  await GetAppointments(entitySetter, size, num, t);
};

export const Delete = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await deleteAppointment(item._id, t);
  await GetAppointments(entitySetter, size, num, t);
  await GetAppointmentsStats(numericSetter, graphSetter, t);
};

export const DeleteAll = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await deleteAllAppointments(item._id, t);
  await GetAppointments(entitySetter, size, num, t);
  await GetAppointmentsStats(numericSetter, graphSetter, t);
};
