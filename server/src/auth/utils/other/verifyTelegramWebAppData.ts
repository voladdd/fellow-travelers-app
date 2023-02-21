import { createHmac } from 'node:crypto';

interface UserField {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

const parseFieldValue = (fieldsArray: string[], fieldName: string) => {
  const fieldIndex = fieldsArray.findIndex((str) =>
    str.startsWith(`${fieldName}=`),
  );
  return fieldsArray.splice(fieldIndex)[0].split('=')[1];
};

export const verifyTelegramWebAppData = async (
  telegramInitData: string,
): Promise<UserField | null> => {
  // The data is a query string, which is composed of a series of field-value pairs.
  const encoded = decodeURIComponent(telegramInitData);

  // HMAC-SHA-256 signature of the bot's token with the constant string WebAppData used as a key.
  const secret = createHmac('sha256', 'WebAppData').update(
    process.env.TELEGRAM_BOT_TOKEN,
  );

  // Data-check-string is a chain of all received fields'.
  const arr = encoded.split('&');
  const hash = parseFieldValue(arr, 'hash');
  // sorted alphabetically
  arr.sort((a, b) => a.localeCompare(b));
  // in the format key=<value> with a line feed character ('\n', 0x0A) used as separator
  // e.g., 'auth_date=<auth_date>\nquery_id=<query_id>\nuser=<user>
  const dataCheckString = arr.join('\n');

  // The hexadecimal representation of the HMAC-SHA-256 signature of the data-check-string with the secret key
  const _hash = createHmac('sha256', secret.digest())
    .update(dataCheckString)
    .digest('hex');

  // if hash are equal the data may be used on your server.
  // Complex data types are represented as JSON-serialized objects.
  if (_hash === hash) {
    //return user object
    const user = parseFieldValue(arr, 'user');
    return JSON.parse(user);
  }
  return null;
};
