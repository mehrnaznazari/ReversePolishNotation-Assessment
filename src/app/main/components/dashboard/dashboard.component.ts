import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent implements OnInit {
    inputArray!: string;
    result!: string;

    constructor() {
    }

    ngOnInit(): void {
    }

    calculate(): void {
        this.result = this.reversePolishNotation(JSON.parse(this.inputArray));
    }

    reversePolishNotation(arr) {
        let stack = [];
        for (let i = 0; i < arr.length; i++) {
            let pivot = arr[i];
            if (!isNaN(pivot))
                stack.push(Number(pivot));
            else {
                let item1 = stack.pop();
                let item2 = stack.pop();

                switch (pivot) {
                    case '/':
                        stack.push(Math.round((item2 / item1) * 10) / 10);
                        break;
                    case '*':
                        stack.push(Math.round((item2 * item1) * 10) / 10);
                        break;
                    case '-':
                        stack.push(item2 - item1);
                        break;
                    case '+':
                        stack.push(item2 + item1);
                        break;
                }
            }
        }
        return stack.pop();
    }

}
