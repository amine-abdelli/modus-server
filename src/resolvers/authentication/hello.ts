
interface helloArgsInterface {
  message: string
}

async function hello(parent: any, { message }: helloArgsInterface, context: any) {
  try {
    return message + "Halleluja"
  } catch (e) {
    console.log();
    (e);
    throw e;
  }
}

export { hello };
