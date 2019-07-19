docker build -t pavittwk/nodejs:latest -t pavittwk/nodejs:$SHA -f  ./tedxchulaapp/Dockerfile ./tedxchulaapp
 
docker push pavittwk/nodejs:latest
docker push pavittwk/nodejs:$SHA

kubectl apply -f config
kubectl set image deployments/nodejs-deployment nodejs=pavittwk/nodejs:$SHA
