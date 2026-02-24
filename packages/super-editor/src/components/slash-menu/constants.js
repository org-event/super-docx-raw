import AddRowTopIcon from '../doc-icons/AddRowTopIcon.svg?raw';
import AddRowBottomIcon from '../doc-icons/AddRowBottomIcon.svg?raw';
import AddColLeftIcon from '../doc-icons/AddColLeftIcon.svg?raw';
import AddColRightIcon from '../doc-icons/AddColRightIcon.svg?raw';
import TrashIcon from '../doc-icons/TrashIcon.svg?raw';
import RemoveRowIcon from '../doc-icons/RemoveRowIcon.svg?raw';
import RemoveColIcon from '../doc-icons/RemoveColIcon.svg?raw';
import TableCellMergeIcon from '../doc-icons/TableCellMergeIcon.svg?raw';
import TableCellSplitIcon from '../doc-icons/TableCellSplitIcon.svg?raw';
import PlusIcon from '../doc-icons/PlusIcon.svg?raw';
import CheckIcon from '../doc-icons/CheckIcon.svg?raw';
import XIcon from '../doc-icons/XIcon.svg?raw';
import LinkIcon from '../doc-icons/LinkIcon.svg?raw';
import TableIcon from '../doc-icons/TableIcon.svg?raw';
import CopyIcon from '../doc-icons/CopyIcon.svg?raw';
import ClipboardIcon from '../doc-icons/ClipboardIcon.svg?raw';
import AiSparklesIcon from '../doc-icons/AiSparklesIcon.svg?raw';

import Wrench from '../doc-icons/WrenchSolidIcon.svg?raw';
import BorderNoneIcon from '../doc-icons/BorderNoneSolidIcon.svg?raw';
import ScissorsIcon from '../doc-icons/ScissorsSolidIcon.svg?raw';

export const ICONS = {
  addRowBefore: AddRowTopIcon,
  addRowAfter: AddRowBottomIcon,
  addColumnBefore: AddColLeftIcon,
  addColumnAfter: AddColRightIcon,
  deleteRow: RemoveRowIcon,
  deleteColumn: RemoveColIcon,
  deleteTable: TrashIcon,
  deleteBorders: BorderNoneIcon,
  mergeCells: TableCellMergeIcon,
  splitCell: TableCellSplitIcon,
  fixTables: Wrench,
  ai: AiSparklesIcon,
  link: LinkIcon,
  table: TableIcon,
  cut: ScissorsIcon,
  copy: CopyIcon,
  paste: ClipboardIcon,
  addDocumentSection: PlusIcon,
  removeDocumentSection: TrashIcon,
  trackChangesAccept: CheckIcon,
  trackChangesReject: XIcon,
};

// Table actions constant
export const TEXTS = {
  addRowBefore: 'Вставить строку сверху',
  addRowAfter: 'Вставить строку снизу',
  addColumnBefore: 'Вставить столбец слева',
  addColumnAfter: 'Вставить столбец справа',
  deleteRow: 'Удалить строку',
  deleteColumn: 'Удалить столбец',
  deleteTable: 'Удалить таблицу',
  toggleBorders: 'Включить/выключить границы',
  removeBorders: 'Убрать границы',
  mergeCells: 'Объединить ячейки',
  splitCell: 'Разделить ячейку',
  fixTables: 'Исправить таблицы',
  insertText: 'Вставить текст',
  replaceText: 'Заменить текст',
  insertLink: 'Вставить ссылку',
  insertTable: 'Вставить таблицу',
  editTable: 'Редактировать таблицу',
  cut: 'Вырезать',
  copy: 'Копировать',
  paste: 'Вставить',
  removeDocumentSection: 'Удалить раздел',
  createDocumentSection: 'Создать раздел',
  trackChangesAccept: 'Принять изменение',
  trackChangesReject: 'Отклонить изменение',
};

export const tableActionsOptions = [
  {
    label: TEXTS.addRowBefore,
    command: 'addRowBefore',
    icon: ICONS.addRowBefore,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Add row before',
    },
  },
  {
    label: TEXTS.addRowAfter,
    command: 'addRowAfter',
    icon: ICONS.addRowAfter,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Add row after',
    },
  },
  {
    label: TEXTS.addColumnBefore,
    command: 'addColumnBefore',
    icon: ICONS.addColumnBefore,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Add column before',
    },
  },
  {
    label: TEXTS.addColumnAfter,
    command: 'addColumnAfter',
    icon: ICONS.addColumnAfter,
    bottomBorder: true,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Add column after',
    },
  },
  {
    label: TEXTS.deleteRow,
    command: 'deleteRow',
    icon: ICONS.deleteRow,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Delete row',
    },
  },
  {
    label: TEXTS.deleteColumn,
    command: 'deleteColumn',
    icon: ICONS.deleteColumn,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Delete column',
    },
  },
  {
    label: TEXTS.deleteTable,
    command: 'deleteTable',
    icon: ICONS.deleteTable,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Delete table',
    },
  },
  {
    label: TEXTS.removeBorders,
    command: 'deleteCellAndTableBorders',
    icon: ICONS.deleteBorders,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Delete cell and table borders',
    },
  },
  {
    label: TEXTS.toggleBorders,
    command: 'toggleCellAndTableBorders',
    icon: ICONS.deleteBorders,
    bottomBorder: true,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Toggle cell and table borders',
    },
  },
  {
    label: TEXTS.mergeCells,
    command: 'mergeCells',
    icon: ICONS.mergeCells,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Merge cells',
    },
  },
  {
    label: TEXTS.splitCell,
    command: 'splitCell',
    icon: ICONS.splitCell,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Split cells',
    },
  },
  {
    label: TEXTS.fixTables,
    command: 'fixTables',
    icon: ICONS.fixTables,
    props: {
      'data-item': 'btn-tableActions-option',
      ariaLabel: 'Fix tables',
    },
  },
];

export const TRIGGERS = {
  slash: 'slash',
  click: 'click',
};
