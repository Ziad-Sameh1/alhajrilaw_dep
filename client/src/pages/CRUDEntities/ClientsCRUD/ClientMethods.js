import {
  addClient,
  updateClient,
  getClients,
  getClientsByName,
  getClientsStats,
  deleteClient,
  deleteAllClients,
} from "../../../services/ClientsService";

export const GetClients = async (entitySetter, size, num, t) => {
  console.log(`size: ${size}, num: ${num}`);
  const res = await getClients(size, num, t);
  entitySetter(res);
};

export const GetClientsStats = async (numericSetter, graphSetter, t) => {
  try {
    const res = await getClientsStats(t);
    numericSetter({ all: res.all, month: res.month, day: res.day });
    const graph = [
      {
        name: t("january"),
        clients: res.monthly[0],
      },
      {
        name: t("february"),
        clients: res.monthly[1],
      },
      {
        name: t("march"),
        clients: res.monthly[2],
      },
      {
        name: t("april"),
        clients: res.monthly[3],
      },
      {
        name: t("may"),
        clients: res.monthly[4],
      },
      {
        name: t("june"),
        clients: res.monthly[5],
      },
      {
        name: t("july"),
        clients: res.monthly[6],
      },
      {
        name: t("august"),
        clients: res.monthly[7],
      },
      {
        name: t("september"),
        clients: res.monthly[8],
      },
      {
        name: t("october"),
        clients: res.monthly[9],
      },
      {
        name: t("november"),
        clients: res.monthly[10],
      },
      {
        name: t("december"),
        clients: res.monthly[11],
      },
    ];
    graphSetter(graph);
  } catch (err) {
    console.log(err);
  }
};

export const GetClientsByName = async (
  entitySetter,
  searchFieldSetter,
  name,
  t
) => {
  searchFieldSetter(name);
  const res = await getClientsByName(name, t);
  entitySetter(res);
};

export const AddClient = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await addClient(item, t);
  await GetClients(entitySetter, size, num, t);
  await GetClientsStats(numericSetter, graphSetter, t);
};

export const UpdateClient = async (item, entitySetter, size, num, t) => {
  await updateClient(item, t);
  await GetClients(entitySetter, size, num, t);
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
  await deleteClient(item._id, t);
  await GetClients(entitySetter, size, num, t);
  await GetClientsStats(numericSetter, graphSetter, t);
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
  await deleteAllClients(item._id, t);
  await GetClients(entitySetter, size, num, t);
  await GetClientsStats(numericSetter, graphSetter, t);
};
