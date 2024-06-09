import {
  addMessage,
  updateMessage,
  getMessages,
  getMessagesByName,
  getMessagesStats,
  deleteMessage,
  deleteAllMessages,
} from "../../../services/MessageService";

export const GetMessages = async (entitySetter, size, num, t) => {
  console.log(`size: ${size}, num: ${num}`);
  const res = await getMessages(size, num, t);
  entitySetter(res);
};

export const GetMessagesStats = async (numericSetter, graphSetter, t) => {
  const res = await getMessagesStats(t);
  numericSetter({ all: res.all, month: res.month, day: res.day });
  const graph = [
    {
      name: t("january"),
      messages: res.monthly[0],
    },
    {
      name: t("february"),
      messages: res.monthly[1],
    },
    {
      name: t("march"),
      messages: res.monthly[2],
    },
    {
      name: t("april"),
      messages: res.monthly[3],
    },
    {
      name: t("may"),
      messages: res.monthly[4],
    },
    {
      name: t("june"),
      messages: res.monthly[5],
    },
    {
      name: t("july"),
      messages: res.monthly[6],
    },
    {
      name: t("august"),
      messages: res.monthly[7],
    },
    {
      name: t("september"),
      messages: res.monthly[8],
    },
    {
      name: t("october"),
      messages: res.monthly[9],
    },
    {
      name: t("november"),
      messages: res.monthly[10],
    },
    {
      name: t("december"),
      messages: res.monthly[11],
    },
  ];
  graphSetter(graph);
};

export const GetMessagesByName = async (
  entitySetter,
  searchFieldSetter,
  name,
  t
) => {
  searchFieldSetter(name);
  const res = await getMessagesByName(name, t);
  entitySetter(res);
};

export const AddMessages = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await addMessage(item, t);
  await GetMessages(entitySetter, size, num, t);
  await GetMessagesStats(numericSetter, graphSetter, t);
};

export const UpdateMessages = async (item, entitySetter, size, num, t) => {
  await updateMessage(item, t);
  await GetMessages(entitySetter, size, num, t);
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
  await deleteMessage(item._id, t);
  await GetMessages(entitySetter, size, num, t);
  await GetMessagesStats(numericSetter, graphSetter, t);
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
  await deleteAllMessages(item._id, t);
  await GetMessages(entitySetter, size, num, t);
  await GetMessagesStats(numericSetter, graphSetter, t);
};
