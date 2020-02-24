import React, { FunctionComponent } from 'react';
import { ICategory } from 'types/Shop';

interface ICategoryItemProps extends ICategory {
  changeCategory: (c: string) => void;
}

const CategoriesItem: FunctionComponent<ICategoryItemProps> = ({
  title,
  isActive,
  changeCategory
}) => (
  <li className="p-t-4">
    <button
      type="button"
      className="s-text13"
      style={isActive ? { color: 'red' } : {}}
      onClick={() => changeCategory(title)}
    >
      {title}
    </button>
  </li>
);

export default CategoriesItem;
