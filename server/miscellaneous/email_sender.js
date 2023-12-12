const Sib = require("sib-api-v3-sdk");

const emailSender = async (email) => {
  try {
    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications["api-key"];

    console.log(email)

    apiKey.apiKey =
      "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";

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
      email: "priyanshurathore0123@gmail.com",
    };

    const receivers = [
      {
        email: email ,
      },
    ];

    console.log(receivers);

    const resp = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "hello world",
      textContent: `
    Sharpener
    `,
    });

    console.log(resp, "hsudsudh");

    return "email sent";
  } catch (e) {
    return e;
  }
};

module.exports = {
  emailSender,
};
