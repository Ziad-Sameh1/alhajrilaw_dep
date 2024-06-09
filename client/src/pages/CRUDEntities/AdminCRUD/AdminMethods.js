import {
  addAdmin,
  deleteAdmin,
  getAdminByEmail,
  getAdminEmail,
  getAdmins,
  getAdminStats,
  logout,
  updateAdmin,
} from "../../../services/AdminService";

export const get = async (entitySetter, size, num, t) => {
  const res = await getAdmins(size, num, t);
  entitySetter(res);
};

export const GetAdminEmail = async (entitySetter, t) => {
  const res = await getAdminEmail(t, true);
  if (res) {
    entitySetter(res.email);
  }
};

export const getStats = async (numericSetter, graphSetter, t) => {
  const res = await getAdminStats(t);
  numericSetter({ all: res.all, month: res.month, day: res.day });
  const graph = [
    {
      name: t("january"),
      admins: res.monthly[0],
    },
    {
      name: t("february"),
      admins: res.monthly[1],
    },
    {
      name: t("march"),
      admins: res.monthly[2],
    },
    {
      name: t("april"),
      admins: res.monthly[3],
    },
    {
      name: t("may"),
      admins: res.monthly[4],
    },
    {
      name: t("june"),
      admins: res.monthly[5],
    },
    {
      name: t("july"),
      admins: res.monthly[6],
    },
    {
      name: t("august"),
      admins: res.monthly[7],
    },
    {
      name: t("september"),
      admins: res.monthly[8],
    },
    {
      name: t("october"),
      admins: res.monthly[9],
    },
    {
      name: t("november"),
      admins: res.monthly[10],
    },
    {
      name: t("december"),
      admins: res.monthly[11],
    },
  ];
  graphSetter(graph);
};

export const getByEmail = async (entitySetter, searchFieldSetter, email, t) => {
  searchFieldSetter(email);
  const res = await getAdminByEmail(email, t);
  entitySetter(res);
};

export const post = async (item, entitySetter, size, num, t) => {
  await addAdmin(item, t);
  get(entitySetter, size, num, t);
};

export const update = async (item, entitySetter, size, num, t) => {
  await updateAdmin(item._id, item.role, t);
  get(entitySetter, size, num, t);
};

export const dlt = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  console.log(item);
  await deleteAdmin(item._id, t);
  await get(entitySetter, size, num, t);
  await getStats(numericSetter, graphSetter, t);
};

export const Logout = async (t) => {
  await logout(t);
};
