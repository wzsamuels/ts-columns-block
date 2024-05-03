/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
  const { columns, stack, reverseStack } = attributes;
  const blockProps = useBlockProps.save();
  const {children, ...innerBlocksProps} = useInnerBlocksProps.save( blockProps );

  return (
    <section {...innerBlocksProps}>
      <div className={`flex flex-wrap lg:flex-row ${ stack ? 'flex-col' : 'flex-row'}`}>
        {children}
      </div>
    </section>
  )
  
}

/*
return (
      <div {...blockProps} className={`grid gap-4 ${stack ? `grid-columns-1 lg:grid-cols-${columns}` : `grid-cols-${columns}`}`}>
          <InnerBlocks.Content />
      </div>
      
  );
  */