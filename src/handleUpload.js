import { set, omit } from "lodash";

const getFileName = (urlPrefix, filePath) => `${urlPrefix}${filePath}`;

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const GET_URL_PREFIX = "getURLPrefix";
const GET_URL_FOR_FILE_UPLOAD = "getURLForFileUpload";
const CREATE_CHECKOUT_SESSION = "createCheckoutSession";

export const createCheckoutSession = async (data) => {
  return await fetch(`${baseUrl}/${CREATE_CHECKOUT_SESSION}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
export const handleUpload = async (files) => {
  const imageUrlsMap = {};
  const { urlPrefix } = await fetch(`${baseUrl}/${GET_URL_PREFIX}`).then(
    (res) => res.json()
  );

  for await (const file of files) {
    const pathArrayForFile = file.path.split("/").slice(1);

    const { url } = await fetch(
      `${baseUrl}/${GET_URL_FOR_FILE_UPLOAD}?${getFileName(
        urlPrefix,
        file.path
      )}`
    ).then((res) => res.json());

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
    set(imageUrlsMap, pathArrayForFile, url.split("?")[0]);
  }
  return [urlPrefix, imageUrlsMap];
};
