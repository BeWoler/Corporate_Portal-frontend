import { FC, useContext } from "react";
import { Context } from "../../index";

const MainPage: FC = () => {
  const { store } = useContext(Context);
  const check = () => (store.isAuth ? store.user.username : "new member");
  return (
    <main>
      <h2>Hello {check()}!</h2>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem architecto porro laborum repudiandae consectetur vitae
          pariatur iure dolor mollitia quasi quod, maiores, eaque culpa? Ipsum
          explicabo repudiandae facilis laborum ullam.
        </p>
      </div>
    </main>
  );
};

export default MainPage;
