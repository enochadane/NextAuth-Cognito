import { Amplify } from "aws-amplify";
import config from "../amplifyconfiguration.json";
Amplify.configure(config);

export default function Home() {
  return <div>Amplify Login...</div>;
}
