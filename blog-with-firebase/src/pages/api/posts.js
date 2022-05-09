import * as yup from 'yup'
import { firestore } from 'src/utils/firebase'

export default async function handler(req, res) {
  switch (req.method) {
    // create new post
    case 'POST':
      try {
        await yup
          .object()
          .shape({
            title: yup.string().required().min(3),
            preview: yup.string().required().min(5),
            content: yup.string().required().min(5),
          })
          .validate(req.body, { abortEarly: false })

        const attrs = {
          ...req.body,
          createdAt: new Date(),
        }

        const ref = await firestore.collection('posts').add(attrs)

        const doc = await ref.get()
        const post = { id: doc.id, ...doc.data() }

        res.status(201).json({ data: post })
      } catch (err) {
        res.status(422).json({ errors: err.errors })
      }
      break
    default:
      res.status(405).send('Method not allowed.')
      break
  }
}
