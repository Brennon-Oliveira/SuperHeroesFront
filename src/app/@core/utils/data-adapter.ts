import { NativeDateAdapter } from '@angular/material/core';
import moment from 'moment';

export class SuperHeroesDateAdapter extends NativeDateAdapter {
    override parse(value: any): Date {
        const date = moment(value, 'DD/MM/YYYY', true);

        return date.toDate();
    }

    override format(date: Date, displayFormat: string): string {
        if (
            date.toISOString() === new Date(1969, 11, 31, 19, 59, 59).toISOString() ||
            date.toISOString() === new Date(1969, 11, 31, 20, 0, 0).toISOString()
        ) {
            return '';
        }

        return moment(date).format('DD/MM/YYYY');
    }
}
