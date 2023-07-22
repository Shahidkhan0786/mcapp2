import axios from "axios";
const LandingPage = ({ currentUser }) => {
  console.log(" I am in a component ");
  return (
    <>
      <h1>Landing page</h1>;
      {/* {currentUser ? "welcome" : "you are not authorized!"} */}
    </>
  );
};

LandingPage.getInitialProps = async () => {
  //   console.log("i am on a server!");
  // let $url = "";
  if (typeof window === "undefined") {
    console.log("on Serverrrrr");
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/cuser",
      {
        headers: {
          Host: "ticket.com",
        },
      }
    );
    return data;
  } else {
    console.log("on Brow");

    let $url = "/api/users/cuser";
    const { data } = await axios.get($url);
    console.log("on browser", data);
    return data;
  }
};
export default LandingPage;
