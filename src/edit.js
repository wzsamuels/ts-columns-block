/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, useInnerBlocksProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { ToggleControl, RangeControl, PanelBody } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

  const { columns, stack, reverseStack } = attributes;
  const blockProps = useBlockProps({className: 'flex flex-wrap w-full'});
  const {children, ...innerBlocksProps} = useInnerBlocksProps( blockProps,
    { allowedBlocks: ['core/column'],
      template: [
        ['core/column', {}, [
            ['core/paragraph', { placeholder: 'Enter text...' }]
        ]],
        ['core/column', {}, [
            ['core/paragraph', { placeholder: 'Enter text...' }]
        ]]
    ]});
	return (
		<>
			<InspectorControls>
        <PanelBody title="Gallery Settings" initialOpen={true}>
          <RangeControl
              label="Columns"
              value={columns}
              onChange={(newColumns) => setAttributes({ columns: newColumns })}
              min={1}
              max={5}
          />
          <ToggleControl
            label="Stack on mobile"
            help={
                stack
                    ? 'Stack on mobile.'
                    : 'Do not stack on mobile.'
            }
            checked={ stack }
            onChange={ (newValue) => {
                setAttributes({stack: newValue});
            } }
          />
          { stack &&
            <ToggleControl
              label="Reverse stack direction on mobile"
              checked={reverseStack}
              onChange={ (newValue) => {
                setAttributes({reverseStack: newValue});
            } }
              />          
          } 
        </PanelBody>
      </InspectorControls>
      <div {...innerBlocksProps}>
        <div className='flex flex-wrap'>
          {children}
        </div>
      </div>
        </>
	);
}
