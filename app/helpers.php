<?php

use App\Models\User;
use App\Services\UserContextService;

function currentUser(): User
{
    return app(UserContextService::class)->getOrCreateCurrentUser();
}