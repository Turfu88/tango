<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * GameBuilderController
 * Routes only for development
 * See config/dev/game_builder.yml
 */
class GameBuilderController extends AbstractController
{
    #[Route('/game-builder/editor', name: 'game_builder_editor')]
    public function gameBuilderEditor(): Response
    {
        return $this->render('game_builder_editor.html.twig', [
            'app' => 'gameBuilderEditor',
        ]);
    }

    #[Route('/game-builder/sandbox', name: 'game_builder_sandbox')]
    public function gameBuilderSandbox(): Response
    {
        return $this->render('game_builder_sandbox.html.twig', [
            'app' => 'gameBuilderSandbox',
        ]);
    }

    #[Route('/game-builder', name: 'game_builder')]
    public function gameBuilder(): Response
    {
        return $this->render('game_builder.html.twig', [
            'app' => 'gameBuilder',
        ]);
    }
    #[Route('/game-builder/export', name: 'game_buider_export_new_puzzle', methods: ['POST',])]
    public function exportNewPuzzle(Request $request): JsonResponse
    {
        $data = $request->getContent();
        json_decode($data);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return new JsonResponse('error');
        }

        $directory = $this->getParameter('kernel.project_dir') . "/app/ressources/";
        if (!file_exists($directory)) {
            mkdir($directory, 0777, true);
        }

        $gridType = $request->getPayload()->get('grid');
        $gameId = $request->getPayload()->get('id');
        $fileName = "game_" . $gridType . "_" . $gameId;
        $filePath = $directory . "games/" .  $fileName . ".json";
        
        file_put_contents($filePath, $data);
    
        // Mise à jour du fichier games_list.json
        $gamesListPath = $directory . "games_list.json";
        
        // Vérification de l'existence du fichier
        if (file_exists($gamesListPath)) {
            $gamesList = json_decode(file_get_contents($gamesListPath), true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return new JsonResponse('error');
            }
        } else {
            $gamesList = [];
        }
    
        // Ajout du nouveau jeu à la bonne catégorie
        $key = "grid_" . $gridType . 'x' . $gridType;
        if (!isset($gamesList[$key])) {
            $gamesList[$key] = [];
        }
        if (!in_array($fileName, $gamesList[$key])) {
            $gamesList[$key][] = $fileName;
        }
    
        // Réécriture du fichier games_list.json
        file_put_contents($gamesListPath, json_encode($gamesList, JSON_PRETTY_PRINT));

        return new JsonResponse('ok');
    }
   
}
