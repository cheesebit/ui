import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { shallow, render, mount } from 'enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());

Enzyme.configure({ adapter: new Adapter() });

global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should;

global.sinon = sinon;

global.mount = mount;
global.render = render;
global.shallow = shallow;
