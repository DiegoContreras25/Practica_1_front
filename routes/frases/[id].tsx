import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

type frases = {
  frases: string;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, frases>) => {
    try {
      const frases = await Axios.get<frases>(
        `https://filmquotes.deno.dev/`,
      );
      if (frases.status !== 200) {
        throw new Error("ERROR");
      }
      return ctx.render(frases.data);
    } catch (e) {
      throw e;
    }
  },
};

const Page = (props: PageProps<frases>) => {
  const frases = props.data;
  return (
    <div>
      <h1>{frases.frases}</h1>
    </div>
  );
};

export default Page;
