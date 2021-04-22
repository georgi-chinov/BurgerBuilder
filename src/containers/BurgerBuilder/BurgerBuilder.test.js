import React from "react";
import { configure, shallow } from "enzyme";
import { BurgerBuilder } from "./BurgerBuilder";
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("BurgerBuilder", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BurgerBuilder onInitIgredient={() => {}}></BurgerBuilder>
    );
  });
  it("should render Build Controls when there are ingredients", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
