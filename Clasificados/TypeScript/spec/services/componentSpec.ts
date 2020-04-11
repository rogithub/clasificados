import { Component } from '../../services/component';
import ko from '../specHelpers/koMock';

describe('Component', () => {
    let model = {};
    let service: Component;

    beforeEach(() => {
        ko["components"] = jasmine.createSpyObj('components', ['register']);

        service = new Component(ko);
    });

    describe('register', () => {

        it("should register new component", (done) => {
            let componentName = "test-component";
            let factory = () => { model };
            let template = `<!-- ko template: { name: 'TestTemplate' } --><!-- /ko -->`;

            let secondParam = {
                viewModel: { createViewModel: factory },
                template: template
            };

            expect(service.register(componentName, template, factory));
            expect(ko.components.register).toHaveBeenCalledTimes(1);
            expect(ko.components.register).toHaveBeenCalledWith(componentName, secondParam);
            done();
        });
    });
});
