import React, { FunctionComponent } from 'react';

import { ICategory } from 'types/Shop';
import CategoriesItem from './CategoriesItem';

export interface ILeftBarProps {
  categories: ICategory[];
  changeActiveCategory: (str: string) => void;
}

const LeftBar: FunctionComponent<ILeftBarProps> = ({
  categories,
  changeActiveCategory
}) => (
  <section className="bgwhite p-t-55 p-b-65">
    <div className="container">
      <div className="col-sm-6 col-md-4 col-lg-3 p-b-50">
        <div className="leftbar p-r-20 p-r-0-sm">
          <h4 className="m-text14 p-b-7">Categories</h4>
          <ul className="p-b-54">
            {categories.map(c => (
              <CategoriesItem
                title={c.title}
                key={c.title}
                isActive={c.isActive}
                changeCategory={() => changeActiveCategory(c.title)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default LeftBar;
