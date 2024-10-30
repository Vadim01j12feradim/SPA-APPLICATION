sudo docker stop $(sudo docker ps -aq)
sudo docker rm $(sudo docker ps -aq)
sudo docker rmi -f $(sudo docker images -q)
sudo docker volume prune
sudo docker volume prune -f
sudo docker volume rm $(docker volume ls -q)

sudo docker-compose up --build
# -d &&
# sudo docker tag spa-migration sensei2001/spa-migration:2 &&
# sudo docker tag spa-api sensei2001/spa-api:2 &&
# sudo docker tag spa-app sensei2001/spa-app:2 &&
# sudo docker tag spa-socket sensei2001/spa-socket:2

# sudo docker push sensei2001/spa-migration:2
# sudo docker push sensei2001/spa-api:2
# sudo docker push sensei2001/spa-app:2
# sudo docker push sensei2001/spa-socket:2


