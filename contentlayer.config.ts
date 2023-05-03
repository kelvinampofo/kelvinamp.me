import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import readingTime from 'reading-time';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true
    },
    publishedAt: {
      type: 'string',
      required: true
    },
    summary: {
      type: 'string',
      required: true
    }
  },
  computedFields: {
    readingTime: { resolve: (doc) => readingTime(doc.body.raw), type: 'json' },
    url: {
      type: 'string',
      resolve: (post) => `/thoughts/${post._raw.flattenedPath}`
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath
    }
  }
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post]
});
