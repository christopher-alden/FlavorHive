'use client';
import * as React from 'react';

import {cn} from '@utils/utils';

export interface InputPrefixedProps extends React.InputHTMLAttributes<HTMLInputElement> {
    prefix:string
}

const InputPrefixed = React.forwardRef<HTMLInputElement, InputPrefixedProps>(({className, type,prefix,  ...props}, ref) => {
	return (
		<div className={cn(
            'flex w-full rounded-md  border border-input bg-background  ext-base focus-visible:outline-none outline-gray-500 focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50',
            className
        )}>
            <div className='w-fit flex justify-start items-center p-3 px-4 text-gray-500 bg-gray-200'>
                <p>{prefix}</p>
            </div>
            <input
			type={type}
			className={
                "px-3 w-full placeholder:text-gray-400 focus-visible:outline-none outline-gray-500 focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50"
            }
			ref={ref}
			{...props}
		/>
        </div>
	);
});
InputPrefixed.displayName = 'InputPrefixed';

export {InputPrefixed};
