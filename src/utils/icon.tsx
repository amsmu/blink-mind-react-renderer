import * as React from 'react';
export const IconName = {
  MORE: 'more',
  SHOW_MENU: 'show-menu',
  CLOSE: 'close',
  COLOR_PICKER: 'color-picker',
  NOTES: 'notes',
  PLUS: 'plus',
  MINUS: 'minus',
  COLLAPSE_ALL: 'collapse',
  EXPAND_ALL: 'expand',
  CENTER: 'center',
  TRASH: 'trash',
  SEARCH: 'search',
  THEME: 'theme',
  EXPORT: 'export',
  OPEN_FILE: 'openfile',
  OPEN: 'open',
  NEW_FILE: 'newfile',
  SAVE: 'save',
  LAYOUT_LEFT_AND_RIGHT: 'layout-left-and-right',
  LAYOUT_LEFT: 'layout-left',
  LAYOUT_RIGHT: 'layout-right',
  UNDO: 'undo',
  REDO: 'redo',
  MOVE_UP: 'move-up',
  MOVE_DOWN: 'move-down',
  COPY: 'copy',
  RESIZE: 'resize',
  HYPERLINK: 'hyperlink',
  PASTE: 'paste',
  PASTE_AS_TEXT: 'paste-as-text',
  IMAGE: 'image'
};

export function iconClassName(name) {
  return `icon iconfont bm-${name}`;
}

export function Icon(iconName) {
  return <span className={iconClassName(iconName)} />;
}
