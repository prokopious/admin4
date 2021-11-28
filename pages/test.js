import Amplify from "aws-amplify"
import { AmplifyS3Image } from "@aws-amplify/ui-react"
import awsconfig from "../src/aws-exports"
import { Storage } from "aws-amplify"
import { useEffect, React, useState } from "react"
import Link from "next/link"

Amplify.configure(awsconfig)

export default function App() {
  const [l, setL] = useState([])

  useEffect(() => {
    listFiles()
  }, []);

  async function listFiles() {
    const files = await Storage.list("")
    console.log("listed")
    setL(files)
  }
  console.log("testing")
  return (
    <>
      <div>
        <div className="outerBox">
          <div>
            {l.map((file, i) => {
                if (l.indexOf(file) % 2 == 1) 
              return (
             
                <div className="imageBox">
                  <Link href="/images/[key]" as={`/images/${file.key}`}>
                  <a>
                      <AmplifyS3Image imgKey={file.key} />
                    </a>
                  </Link>
                </div>
              )
            })}
          </div>
          <div>
            {l.map((file, i) => {
              if (l.indexOf(file) % 2 == 0) 
              return (
             
                <div className="imageBox2">
                  <Link href="/images/[key]" as={`/images/${file.key}`}>
                    <a>
                      <AmplifyS3Image imgKey={file.key} />
                    </a>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <style jsx>{`

        .imageBox2 {
          margin-top: 40px;
          margin-bottom: 40px;
          margin-left: 20px;
          margin-right: 40px;
        }
        .imageBox {
          margin-top: 40px;
          margin-bottom: 40px;
          margin-left: 40px;
          margin-right: 20px;
        }

        .outerBox {
          display: grid;
          grid-template-columns: 1fr 1fr;
     
      
        }
      `}</style>
    </>
  )
}
