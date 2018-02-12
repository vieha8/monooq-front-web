import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/';
import InputForm from '../components/InputForm';
import TextFieldFormDefault from '../components/TextFieldFormDefault';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { FormLabel, FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

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
        margin: '20px auto',
      }}
    >
      <Header />
      <Typography type="title" component="h1">
        場所の登録をする
      </Typography>
      <hr color="#eee" />

      <div style={{ marginBottom: '20px' }}>
        <img
          src="https://picsum.photos/900?image=65"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '450px',
          }}
          alt="test"
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

        <div style={{ padding: '0 1vw' }}>
          <Typography type="body2" component="h1">
            場所に関して
          </Typography>
          <InputForm text="場所の名前" />
          <br />
          <TextFieldFormDefault text="場所の説明" />
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '0 1vw' }}>
        <Typography type="body2" component="h1">
          料金に関して
        </Typography>
        <InputForm text="1日の料金" />
        <br />
        <InputForm text="1ヶ月の料金" />
        <br />
      </div>

      <div style={{ marginBottom: '20px', padding: '0 1vw' }}>
        <Typography type="body2" component="h1">
          荷物のやり取りに関して
        </Typography>
        <InputForm text="受け取り場所" />
        <br />
        <FormLabel style={{ marginTop: '10px' }} component="legend">
          受け取り・引き取りがしやすい曜日
        </FormLabel>
        <FormGroup>
          <FormControlLabel control={<Checkbox value="月" />} label="月" />
          <FormControlLabel control={<Checkbox value="火" />} label="火" />
          <FormControlLabel control={<Checkbox value="水" />} label="水" />
          <FormControlLabel control={<Checkbox value="木" />} label="木" />
          <FormControlLabel control={<Checkbox value="金" />} label="金" />
        </FormGroup>
        <TextFieldFormDefault text="やり取りに関する補足" />
        <br />
      </div>

      <Button
        color="primary"
        raised
        style={{ marginRight: '10px' }}
        component={Link}
        to={'/manage/space/list'}
      >
        場所を登録する
      </Button>
      <Button raised>保存する</Button>
    </div>
  );
};

export default SpaceForm;
