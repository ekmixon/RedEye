import type { ButtonProps } from '@blueprintjs/core';
import { Classes } from '@blueprintjs/core';
import { css } from '@emotion/react';
import { UtilityStyles } from '@redeye/ui-styles';
import type { ComponentProps, FC } from 'react';

export type InfoRowProps = ComponentProps<'div'> & {
	/** the bp4 button active class */
	active?: ButtonProps['active'];
	/** navigational target, like the `:target` pseudo class */
	target?: boolean;
};

export const InfoRow: FC<InfoRowProps> = ({ className, active, target, ...props }) => (
	<div
		cy-test="info-row"
		className={[Classes.BUTTON, Classes.MINIMAL, active ? Classes.ACTIVE : '', className].join(' ')}
		css={[
			css`
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding: 0.25rem 1rem;
				height: ${defaultInfoRowHeight}px;
			`,
			target && UtilityStyles.targetStyles(),
		]}
		{...props}
	/>
);

export const defaultInfoRowHeight = 32;
