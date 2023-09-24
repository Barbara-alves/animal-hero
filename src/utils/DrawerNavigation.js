import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { VscMenu } from "react-icons/vsc";
import "./../styles/Drawer.css";
import LogoAnimalHero from '../assets/animal-hero.jpg';
import './../styles/classes.css';
import './../styles/tags.css';

const DrawerNavigation = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <main>
        {user.roles === "administrador" && (
          <button className="img-clicavel div-adm" onMouseEnter={toggleDrawer}>
                        <VscMenu className='menu-icone' onClick={() =>
                navigate("/smartlocker/RelatorioAgendamentos", {
                  state: { user },
                })}>
                    
                </VscMenu>
            {/* <img
              // src={administrador}
              alt="Acesso do Administrador"
              title="Acesso do Administrador"
              onClick={() =>
                navigate("/smartlocker/RelatorioAgendamentos", {
                  state: { user },
                })
              }
            /> */}
          </button>
        )}

        <Drawer open={isOpen} onClose={toggleDrawer}>
          <List className="Drawer">
            <img
              src={LogoAnimalHero}
              alt="logo smartlocker"
              className="Smartlocker-logo"
            />
            <ListItem
              button
              onClick={() =>
                navigate("/smartlocker/Hover", { state: { user } })
              }
            >
              <ListItemText primary="Status" />
            </ListItem>
            <ListItem
              button
              onClick={() =>
                navigate("/smartlocker/RelatorioAgendamentos", {
                  state: { user },
                })
              }
            >
              {/* <img src={relatorio} className='img-clicavel-dentro-drawer' alt="relatório" title='Relatório de Agendamentos'></img> */}
              <ListItemText primary="Relatório de Agendamentos" />
            </ListItem>

            <ListItem
              button
              onClick={() =>
                navigate("/smartlocker/PerfisDeUsuario", { state: { user } })
              }
            >
              {/* <img src={usuariosPermissao} className='img-clicavel-dentro-drawer' alt="Usuários" title='Perfis de Usuários'  /> */}
              <ListItemText primary="Perfis de Usuários" />
            </ListItem>
            <ListItem
              button
              onClick={() =>
                navigate("/smartlocker/VisualizarGraficos", {
                  state: { user },
                })
              }
            >
              {/* <img src={usuariosPermissao} className='img-clicavel-dentro-drawer' alt="Usuários" title='Perfis de Usuários'  /> */}
              <ListItemText primary="Gráfico" />
            </ListItem>

            <ListItem
              button
              onClick={() =>
                navigate("/smartlocker/OpcoesDeAcesso", { state: { user } })
              }
            >
              <ListItemText primary="Opções De Acesso" />
            </ListItem>

          </List>
        </Drawer>
      </main>
    </>
  );
};

export default DrawerNavigation;
