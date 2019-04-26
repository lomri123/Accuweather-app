import React from "react";
import Downshift from "downshift";

const itemToString = item => (item ? item.label : "");

export const SearchDS = props => {
  return (
    <Downshift
      itemToString={itemToString}
      onChange={selection =>
        props.handleOnChange(selection.label, selection.code)
      }
    >
      {({
        getLabelProps,
        getInputProps,
        isOpen,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        inputValue
      }) => (
        <div>
          <input
            className="col-4 mx-auto"
            {...getInputProps({ placeholder: "Search a city" })}
          />
          <ul
            className="col-4 mx-auto "
            {...getMenuProps({
              style: isOpen ? { height: 200, overflowY: "scroll" } : null
            })}
          >
            {isOpen
              ? props.cityData
                  .filter(loc =>
                    loc.label.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <li
                      className="list-group-item city-list"
                      {...getItemProps({
                        item,
                        index,
                        key: item.code,
                        style: {
                          backgroundColor:
                            index === highlightedIndex ? "blue" : null
                        }
                      })}
                    >
                      {item.label}, {item.country}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};
