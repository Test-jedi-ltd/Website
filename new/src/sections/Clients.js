import clientOne from "../assets/client-1.svg";
import clientTwo from "../assets/client-2.svg";
import clientThree from "../assets/client-3.png";
import clientFour from "../assets/client-4.svg";
import clientFive from "../assets/client-5.svg";
import clientSix from "../assets/client-6.svg";
import clientSeven from "../assets/client-7.svg";

const clients = [
  { src: clientOne, name: "Client One" },
  { src: clientTwo, name: "Client Two" },
  { src: clientThree, name: "Client Three" },
  { src: clientFour, name: "Client Four" },
  { src: clientFive, name: "Client Five" },
  { src: clientSix, name: "Client Six" },
  { src: clientSeven, name: "Client Seven" },
];

const Clients = () => {
  return (
    <section className="clients-strip" aria-label="Clients">
      <div className="clients-track">
        {[0, 1].map((group) => (
          <div
            className="clients-group"
            key={group}
            aria-hidden={group === 1 ? "true" : undefined}
          >
            {clients.map((client) => (
              <img
                src={client.src}
                alt={group === 0 ? client.name : ""}
                className="client-logo"
                key={client.name}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
