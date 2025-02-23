<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends AbstractController
{
    #[Route('/', name: 'game')]
    public function index(): Response
    {
        return $this->render('game.html.twig', [
            'app' => 'game',
        ]);
    }

    #[Route('/game/{id}', name: 'game_show', requirements: ['id' => '\d+_\d+'], methods: ['GET'])]
    public function game(string $id): JsonResponse
    {
        $filePath = $this->getParameter('kernel.project_dir') . "/app/ressources/games/game_$id.json";
        if (!file_exists($filePath)) {
            return $this->json(['error' => 'Game not found'], Response::HTTP_NOT_FOUND);
        }
        $content = file_get_contents($filePath);
        $gameData = json_decode($content, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->json(['error' => 'JSON parsing error'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($gameData);
    }
}
