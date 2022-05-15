import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import DraftsIcon from '@mui/icons-material/Drafts';
import "@pages/popup/Popup.css";

import CreateButton from './CreateButton';



const Popup = () => {
  const [page, setPage] = React.useState(0);

  /* React.useEffect(() =>{
    chrome.storage.sync.set({page: page}, function() {
      console.log('Value is set to ' + page);
    });
  }, [page]) */

  const save = () => {
    chrome.storage.sync.set({lol: "bruh"}, function() {
      console.log('Value is set to ' + "bruh");
    });
  }
  const load = () => {
    chrome.storage.sync.get('lol', function(result) {
      console.log('Value is  ' + result.lol);
    });
  }
  if (page === 0) {
    return (  
        <div className="App">
          <header className="App-header">
            <Stack spacing={0} direction="row">
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding onClick={() => setPage(1)}>
                    <ListItemButton>
                      <ListItemIcon>
                        <BookmarksIcon color="primary"/>
                      </ListItemIcon>
                      <ListItemText primary="Bokmärk" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => save()}>
                    <ListItemButton>
                      <ListItemIcon>
                        <DarkModeIcon color="primary"/>
                      </ListItemIcon>
                      <ListItemText primary="Nattläge" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding onClick={() => load()}>
                    <ListItemButton>
                      <ListItemIcon>
                        <DashboardIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Layout" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SettingsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Alternativ" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Stack>
          
          </header>
        </div>
    );
  }

  if (page === 1) {
    return (
      <CreateButton setPage={setPage}></CreateButton>
    );
  }

  return (
    <></>
  )
};

export default Popup;
