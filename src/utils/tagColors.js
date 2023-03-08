const emptyTagColors = Object.freeze([
  'cyan',
  'green',
  'blue',
  'magenta',
  'geekblue',
  'purple',
  'volcano',
  'lime',
  'orange',
  'gold',
  'red',
  'yellow',
]);

const solidTagColors = Object.freeze([
  '#2ec7c9',
  '#b6a2de',
  '#5ab1ef',
  '#ffb980',
  '#d87a80',
  '#8d98b3',
  '#e5cf0d',
  '#97b552',
  '#95706d',
  '#dc69aa',
  '#07a2a4',
  '#9a7fd1',
  '#588dd5',
  '#f5994e',
  '#c05050',
  '#59678c',
  '#c9ab00',
  '#7eb00a',
  '#6f5553',
  '#c14089',
]);

const specificColors = Object.freeze({
  Primary: '#2d8cf0',
  LightPrimary: '#5cadff',
  DarkPrimary: '#2b85e4',
  Info: '#2db7f5',
  Success: '#19be6b',
  Warning: '#ff9900',
  Error: '#ed4014',
  Title: '#17233d',
  Content: '#515a6e',
  SubColor: '#808695',
  Disabled: '#c5c8ce',
  Border: '#dcdee2',
  Divider: '#e8eaec',
  Background: '#f8f8f9',
});

export const getEmptyTagColor = (function (list) {
  return (val) => list[val % (list.length || 0)];
})([...emptyTagColors]);

export const getSolidTagColor = (function (list) {
  return (val) => list[val % (list.length || 0)];
})([...solidTagColors]);

export const getSpecificColor = (function (colors) {
  return (val = 'Primary') => colors[val];
})(specificColors);
