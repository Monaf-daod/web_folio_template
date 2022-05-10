function useFetch() {
  const merchant = "test";
  async function getFetch(url, MerchantId, locale = "ar") {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          MerchantId: MerchantId,
          "Accept-Language": locale,
        },
      });
      return response;
    } catch (e) {
      return null;
    }
  }
  async function postFetch(url, MerchantId, body, userID = "") {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          MerchantId: MerchantId,
          UserId: userID,
        },
        body: JSON.stringify(body),
      });
      return response;
    } catch (e) {
      return null;
    }
  }

  async function SignUpPost(body, image, url) {
    const data = new FormData();
    data.append(`image`, image);
    for (let key in body) data.append(key, body[key]);

    const requestOptions = {
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        MerchantId: merchant,
      },
      body: data,
    };
    try {
      const response = await fetch(`${url}`, requestOptions);
      return response;
    } catch (e) {
      return null;
    }
  }

  return [getFetch, postFetch, SignUpPost];
}
export default useFetch;
