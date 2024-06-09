import {
  addStaff,
  deleteStaff,
  deleteAllStaff,
  getStaffByName,
  getStaff,
  getStaffStats,
  updateStaff,
} from "../../../services/StaffService";

export const GetStaff = async (entitySetter, size, num, t) => {
  console.log(`size: ${size}, num: ${num}`);
  const res = await getStaff(size, num, t);
  console.log("here");
  console.log(res);
  entitySetter(res);
};

export const GetStaffStats = async (numericSetter, graphSetter, t) => {
  const res = await getStaffStats(t);
  numericSetter({ all: res.all, month: res.month, day: res.day });
  const graph = [
    {
      name: t("january"),
      staff: res.monthly[0],
    },
    {
      name: t("february"),
      staff: res.monthly[1],
    },
    {
      name: t("march"),
      staff: res.monthly[2],
    },
    {
      name: t("april"),
      staff: res.monthly[3],
    },
    {
      name: t("may"),
      staff: res.monthly[4],
    },
    {
      name: t("june"),
      staff: res.monthly[5],
    },
    {
      name: t("july"),
      staff: res.monthly[6],
    },
    {
      name: t("august"),
      staff: res.monthly[7],
    },
    {
      name: t("september"),
      staff: res.monthly[8],
    },
    {
      name: t("october"),
      staff: res.monthly[9],
    },
    {
      name: t("november"),
      staff: res.monthly[10],
    },
    {
      name: t("december"),
      staff: res.monthly[11],
    },
  ];
  graphSetter(graph);
};

export const GetStaffByName = async (
  entitySetter,
  searchFieldSetter,
  name,
  t
) => {
  searchFieldSetter(name);
  const res = await getStaffByName(name, t);
  entitySetter(res);
};

export const AddStaff = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await addStaff(item, t);
  await GetStaff(entitySetter, size, num, t);
  await GetStaffStats(numericSetter, graphSetter, t);
};

export const UpdateStaff = async (item, entitySetter, size, num, t) => {
  await updateStaff(item, t);
  await GetStaff(entitySetter, size, num, t);
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
  await deleteStaff(item._id, t);
  await GetStaff(entitySetter, size, num, t);
  await GetStaffStats(numericSetter, graphSetter, t);
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
  await deleteAllStaff(item._id, t);
  await GetStaff(entitySetter, size, num, t);
  await GetStaffStats(numericSetter, graphSetter, t);
};
