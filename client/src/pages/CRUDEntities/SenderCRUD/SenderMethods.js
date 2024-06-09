import {
  addSender,
  deleteSender,
  getSenderByEmail,
  getSenderEmail,
  getSenders,
  getSenderStats,
  logout,
  updateSender,
} from "../../../services/SenderService";

export const GetSenders = async (entitySetter, size, num, t) => {
  const res = await getSenders(size, num, t);
  entitySetter(res);
};

export const GetSenderEmail = async (entitySetter, t) => {
  const res = await getSenderEmail(t, true);
  if (res) {
    entitySetter(res.email);
  }
};

export const GetSenderStats = async (numericSetter, graphSetter, t) => {
  const res = await getSenderStats(t);
  numericSetter({ all: res.all, month: res.month, day: res.day });
  const graph = [
    {
      name: t("january"),
      senders: res.monthly[0],
    },
    {
      name: t("february"),
      senders: res.monthly[1],
    },
    {
      name: t("march"),
      senders: res.monthly[2],
    },
    {
      name: t("april"),
      senders: res.monthly[3],
    },
    {
      name: t("may"),
      senders: res.monthly[4],
    },
    {
      name: t("june"),
      senders: res.monthly[5],
    },
    {
      name: t("july"),
      senders: res.monthly[6],
    },
    {
      name: t("august"),
      senders: res.monthly[7],
    },
    {
      name: t("september"),
      senders: res.monthly[8],
    },
    {
      name: t("october"),
      senders: res.monthly[9],
    },
    {
      name: t("november"),
      senders: res.monthly[10],
    },
    {
      name: t("december"),
      senders: res.monthly[11],
    },
  ];
  graphSetter(graph);
};

export const getByEmail = async (entitySetter, searchFieldSetter, email, t) => {
  searchFieldSetter(email);
  const res = await getSenderByEmail(email, t);
  entitySetter(res);
};

export const post = async (item, entitySetter, size, num, t) => {
  await addSender(item, t);
  GetSenders(entitySetter, size, num, t);
};

export const update = async (item, entitySetter, size, num, t) => {
  await updateSender(item._id, item.email, item.receivers, t);
  GetSenders(entitySetter, size, num, t);
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
  console.log('dlttt')
  await deleteSender(item.email, t);
  await GetSenders(entitySetter, size, num, t);
  await GetSenderStats(numericSetter, graphSetter, t);
};

export const Logout = async (t) => {
  await logout(t);
};
