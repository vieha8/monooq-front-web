import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

const tileData = [
  {
    img: 'https://picsum.photos/300?image=65',
    title: '編集',
  },
  {
    img: 'https://picsum.photos/300?image=85',
    title: '編集',
  },
  {
    img: 'https://picsum.photos/300?image=95',
    title: '編集',
  },
  {
    img: 'https://picsum.photos/300?image=115',
    title: '編集',
  },
];

const SpaceForm = () => {
  return (
    <div
      style={{
        width: '50vw',
        margin: '0 auto',
      }}
    >
      <Header />
      <Typography type="title" component="h1">
        場所の登録をする
      </Typography>
      <hr color="#eee" />

      <div style={{ textAlign: 'center' }}>
        <img
          src="https://picsum.photos/900?image=65"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '450px',
          }}
        />
        <GridList className="gridList" cols={4} cellHeight={90}>
          {tileData.map(tile => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                actionIcon={
                  <IconButton>
                    <Icon>photo_camera</Icon>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <br />
        <Button raised>写真を変更する</Button>
      </div>

    </div>
  );
}

export default SpaceForm;
