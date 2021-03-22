import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

// Configure Enzyme for the appropriate React adapter
Enzyme.configure({ adapter: new Adapter() });

// Extend chai
chai.use(chaiEnzyme());

const testsContext = require.context('.', true, /.spec$/);
testsContext.keys().forEach(testsContext);
