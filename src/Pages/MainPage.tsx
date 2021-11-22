import { FC, useContext } from "react";
import { Context } from "../index";
import "../styles/mainPage.css"

const MainPage: FC = () => {
  const { store } = useContext(Context);
  return (
    <main>
      <h2 className="main__title">Hello {store.isAuth ? store.user.username : "new member"}!</h2>
      <div className="main__content">
        <p className="main__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem architecto porro laborum repudiandae consectetur vitae
          pariatur iure dolor mollitia quasi quod, maiores, eaque culpa? Ipsum
          explicabo repudiandae facilis laborum ullam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem architecto porro laborum repudiandae consectetur vitae
          pariatur iure dolor mollitia quasi quod, maiores, eaque culpa? Ipsum
          explicabo repudiandae facilis laborum ullam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem architecto porro laborum repudiandae consectetur vitae
          pariatur iure dolor mollitia quasi quod, maiores, eaque culpa? Ipsum
          explicabo repudiandae facilis laborum ullam.
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
