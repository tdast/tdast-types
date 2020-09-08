import {
  Data as UnistData,
  Literal as UnistLiteral,
  Parent as UnistParent,
} from 'unist';

/** All nodes can contain additional data. */
export interface Data extends UnistData {
  /** Loosely typed to `any` for convenience. */
  [key: string]: any;
}

/**
 * Parent is an abstract node containing other nodes.
 * Not used directly in tdast.
 */
export interface Parent extends UnistParent {
  /** Array of child nodes */
  children: Array<Row | Cell | Column>;
  /** Additional data maybe attached. */
  data?: Data;
}

/**
 * Literal is an abstract node containing a value property.
 * Not used directly in tdast.
 */
export interface Literal extends UnistLiteral {
  /** Primary data value of a literal node. Loosely typed to `any` for convenience. */
  value: any;
  /** Additional data maybe attached. */
  data?: Data;
}

/**
 * Table represents the root of tdast.
 * Can never be used as a child.
 * Can only contain Rows for children.
 */
export interface Table extends Parent {
  /** Table node type. */
  type: 'table';
  /** Can only contain Rows for children. */
  children: Row[];
}

/**
 * Cells are leaf nodes in tdast.
 * Can never contain any other node.
 */
export interface Cell extends Literal {
  /** Cell node type. */
  type: 'cell';
}

/**
 * Columns are special Cells that inform the properties of Cells with matching column index.
 * Can never contain any other node.
 * While it is not explicit in the interface specification, Columns should be children of the first Row in a Table.
 */
export interface Column extends Literal {
  /** Column node type. */
  type: 'column';
  /** Display label of a column. */
  label: string;
  /** Index of Column in relation to other Columns in a Table. */
  index: number;
  /** Optional data type useful to determine data types of Cells matching the Column. */
  dataType?: string;
}

/**
 * Rows organize how tabular data is stored in tdast.
 * Can only contain Cells or Columns for children.
 * While it is not explicit in the interface specification, a Row can only contain Columns if it is the first Row in a Table.
 */
export interface Row extends Parent {
  /** Row node type. */
  type: 'row';
  /** Index of Row in relation to other Rows in a Table. */
  index: number;
  /** Can only contain Cells or Columns for children. */
  children: Array<Cell | Column>;
}
