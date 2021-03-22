import ReactDOM from 'react-dom';
import React, {useEffect, useState} from 'react';

import {ThemeProvider, makeStyles} from '@material-ui/core/styles';
import {CssBaseline, Typography} from '@material-ui/core';
import {BaseMapPicker, Map} from 'geocomponents';

import theme from './theme';
import config from './config.json';
import ResponsiveHeader from './components/ResponsiveHeader';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import {CategoricFilter} from 'geocomponents';

const {mapStyles, defaultStyle, initialViewport, baseUrl, categories} = config;

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    [theme.breakpoints.up('sm')]: {
      left: drawerWidth,
    }
  },
}));

const buildSources = (selectedCategories) => selectedCategories
  .map(id => categories.find(cat => cat.id === id))
  .reduce(
    (sources, category) => ({
      ...sources,
      [category.id]: {
        type: 'geojson',
        data: `${baseUrl}${category.label}${category.label.includes('?') ? '&' : '?'}APP_ID=${process.env.APP_ID}&APP_KEY=${process.env.APP_KEY}`
      }
    }), {});

const buildLayers = (selectedCategories) => selectedCategories
  .map(id => categories.find(cat => cat.id === id))
  .flatMap(category => category.layers.map(
    layer => ({...layer, source: category.id})
  ));

const App = () => {
  const [viewport, setViewport] = useState(initialViewport);
  const [selectedStyleUrl, setSelectedStyleUrl] = useState(defaultStyle);

  const onViewportChange = ({latitude, longitude, zoom, bearing, pitch}) => setViewport({
    latitude,
    longitude,
    zoom,
    bearing,
    pitch,
  });

  const classes = useStyles();

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sources, setSources] = useState(buildSources(selectedCategories));
  const [layers, setLayers] = useState(buildLayers(selectedCategories));

  useEffect(() => {
    const sources = buildSources(selectedCategories);
    const layers = buildLayers(selectedCategories);
    console.log(sources);
    console.log(layers);
    setSources(sources);
    setLayers(layers);
  }, [selectedCategories]);

  const handleDrawerToggle = () => setDrawerOpen(!isDrawerOpen);

  return (<ThemeProvider theme={theme()}>
    <CssBaseline />
    <ResponsiveHeader title="TMB API - Transit Demos" drawerWidth={drawerWidth} onMenuClick={handleDrawerToggle}>
      <Typography variant="caption" noWrap>SIG Libre 2021</Typography>
    </ResponsiveHeader>
    <ResponsiveDrawer width={drawerWidth} isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
      <Typography variant="subtitle2">{baseUrl}/...</Typography>
      <CategoricFilter categories={categories} selected={selectedCategories} onSelectionChange={setSelectedCategories}/>
    </ResponsiveDrawer>
    <main className={classes.content}>
      <Map
        mapStyle={selectedStyleUrl}
        sprite={`https://api.tmb.cat/v1/maps/vts/styles/tmb-lite/sprite?APP_ID=${process.env.APP_ID}&APP_KEY=${process.env.APP_KEY}`}
        sources={sources}
        layers={layers}
        viewport={viewport}
        onViewportChange={onViewportChange}
      />
      <BaseMapPicker
        selectedStyleUrl={selectedStyleUrl}
        onStyleChange={setSelectedStyleUrl}
        styles={mapStyles}
        position='bottom-right'
        direction='up'
      />
    </main>
  </ThemeProvider>);
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App/>, target);
