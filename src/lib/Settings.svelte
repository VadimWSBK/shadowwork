<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t, type Language } from './i18n';
  
  const dispatch = createEventDispatcher<{
    close: void;
    logout: void;
    changePassword: { oldPassword: string; newPassword: string };
    changeName: { newName: string };
    deleteAllData: void;
    deleteProfile: void;
    changeLanguage: { language: 'en' | 'de' | 'pl' };
  }>();

  export let username: string;
  export let email: string | undefined;
  export let currentLanguage: Language;
  export let nameSaveStatus: { success: boolean; message?: string } | null = null;
  
  let showChangePassword = false;
  let showChangeName = false;
  let showDeleteConfirm = false;
  let showDeleteProfileConfirm = false;
  let showChangeLanguage = false;
  
  let oldPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  let newName = '';
  let selectedLanguage: 'en' | 'de' | 'pl' = currentLanguage;
  
  let passwordError = '';
  let nameError = '';
  let nameSuccess = false;
  let deleteSuccess = false;
  let deleteProfileSuccess = false;
  let isDeletingProfile = false;
  let languageSuccess = false;
  let nameChangeSuccess = false;
  let nameChangeError = '';

  // Encryption passphrase UI removed — encryption is automatic now

  function handleChangePassword() {
    passwordError = '';
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      passwordError = t(currentLanguage, 'settings.passwordFieldsRequired');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      passwordError = t(currentLanguage, 'settings.passwordsMismatch');
      return;
    }
    
    if (newPassword.length < 6) {
      passwordError = t(currentLanguage, 'settings.passwordTooShort');
      return;
    }
    
    dispatch('changePassword', { oldPassword, newPassword });
    resetPasswordForm();
  }

  function handleChangeName() {
    nameError = '';
    
    if (!newName.trim()) {
      nameError = t(currentLanguage, 'settings.changeNameInputPlaceholder');
      return;
    }
    
    dispatch('changeName', { newName: newName.trim() });
  }

  // React to save status from parent and show success/error banners
  $: if (nameSaveStatus) {
    if (nameSaveStatus.success) {
      nameChangeSuccess = true;
      nameChangeError = '';
      // Hide form and show success banner like delete flow
      showChangeName = false;
      setTimeout(() => { nameChangeSuccess = false; }, 2000);
    } else {
      nameChangeError = nameSaveStatus.message || t(currentLanguage, 'settings.changeNameErrorTitle');
      nameChangeSuccess = false;
      // Keep form open so user can correct and retry
      showChangeName = true;
    }
  }

  function handleDeleteAllData() {
    dispatch('deleteAllData');
    deleteSuccess = true;
    showDeleteConfirm = false;
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      deleteSuccess = false;
    }, 3000);
  }

  function handleDeleteProfile() {
    isDeletingProfile = true;
    dispatch('deleteProfile');
    
    // Set a timeout to reset the loading state in case something goes wrong
    setTimeout(() => {
      if (isDeletingProfile) {
        console.warn('Delete profile taking too long, resetting UI state');
        isDeletingProfile = false;
        showDeleteProfileConfirm = false;
      }
    }, 10000); // 10 second timeout
    
    // Also set a shorter timeout to show success message before redirect
    setTimeout(() => {
      if (isDeletingProfile) {
        // Show success message briefly before redirect
        deleteProfileSuccess = true;
      }
    }, 2000); // 2 seconds
  }

  function handleChangeLanguage() {
    dispatch('changeLanguage', { language: selectedLanguage });
    languageSuccess = true;
    currentLanguage = selectedLanguage;
    
    setTimeout(() => {
      languageSuccess = false;
    }, 3000);
  }

  function resetPasswordForm() {
    oldPassword = '';
    newPassword = '';
    confirmPassword = '';
    passwordError = '';
    showChangePassword = false;
  }

  function resetNameForm() {
    newName = '';
    nameError = '';
    nameSuccess = false;
    showChangeName = false;
  }

  function resetLanguageForm() {
    selectedLanguage = currentLanguage;
    languageSuccess = false;
    showChangeLanguage = false;
  }

  function handleClose() {
    resetPasswordForm();
    resetNameForm();
    resetLanguageForm();
    showDeleteConfirm = false;
    showDeleteProfileConfirm = false;
    deleteSuccess = false;
    deleteProfileSuccess = false;
    dispatch('close');
  }

  // No handlers; encryption uses automatic project key.
</script>

<!-- Settings Modal -->
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div class="bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="p-6 border-b border-white/20">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94 1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">{t(currentLanguage, 'settings.title')}</h2>
            <p class="text-white/70 text-sm">{username}</p>
            {#if email}
              <p class="text-white/50 text-xs">{email}</p>
            {/if}
          </div>
        </div>
        <button 
          on:click={handleClose}
          class="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-all duration-200"
          aria-label={t(currentLanguage, 'settings.closeAria')}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Settings Options -->
    <div class="p-6 space-y-4">
      
      <!-- Change Language moved to header dropdown -->
      
      <!-- Change Name Section -->
      {#if nameChangeSuccess}
        <!-- Success banner replaces the Change Name container -->
        <div class="p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-green-200 font-medium">{t(currentLanguage, 'settings.changeNameSuccessTitle')}</h3>
              <p class="text-green-300/70 text-sm">{t(currentLanguage, 'settings.changeNameSuccessBody')}</p>
            </div>
          </div>
        </div>
      {:else if nameChangeError}
        <!-- Error banner with Change Name form still visible -->
        <div class="space-y-4">
          <div class="p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-red-500/30 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-red-200 font-medium">{t(currentLanguage, 'settings.changeNameErrorTitle')}</h3>
                <p class="text-red-300/70 text-sm">{nameChangeError}</p>
              </div>
            </div>
          </div>
          <!-- Show Change Name form for retry -->
          <div class="p-4 bg-white/10 border border-white/20 rounded-xl">
            <h3 class="text-white font-medium mb-3">{t(currentLanguage, 'settings.changeName')}</h3>
            <div class="space-y-3">
              <input
                type="text"
                bind:value={newName}
                class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200"
              />
              {#if nameError}
                <p class="text-red-300 text-sm">{nameError}</p>
              {/if}
              <div class="flex gap-2">
                <button 
                  on:click={handleChangeName}
                  class="px-4 py-2 bg-[#0C6E78] hover:bg-[#0A5A63] text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  {t(currentLanguage, 'settings.save')}
                </button>
                <button 
                  on:click={resetNameForm}
                  class="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors duration-200 text-sm"
                >
                  {t(currentLanguage, 'settings.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      {:else if !showChangeName}
        <!-- Default Change Name button -->
        <button 
          on:click={() => { showChangeName = true; newName = username; }}
          class="w-full p-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-200 text-left group"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-medium">{t(currentLanguage, 'settings.changeName')}</h3>
              <p class="text-white/60 text-sm">{t(currentLanguage, 'settings.changeNameSubtitle')}</p>
            </div>
          </div>
        </button>
      {:else}
        <!-- Change Name form when editing -->
        <div class="p-4 bg-white/10 border border-white/20 rounded-xl">
          <h3 class="text-white font-medium mb-3">{t(currentLanguage, 'settings.changeName')}</h3>
          <div class="space-y-3">
            <input
              type="text"
              bind:value={newName}
              placeholder={t(currentLanguage, 'settings.changeNameInputPlaceholder')}
              class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200"
            />
            {#if nameError}
              <p class="text-red-300 text-sm">{nameError}</p>
            {/if}
            <div class="flex gap-2">
              <button 
                on:click={handleChangeName}
                class="px-4 py-2 bg-[#0C6E78] hover:bg-[#0A5A63] text-white rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                {t(currentLanguage, 'settings.save')}
              </button>
              <button 
                on:click={resetNameForm}
                class="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                {t(currentLanguage, 'settings.cancel')}
              </button>
            </div>
          </div>
        </div>
      {/if}

      <!-- Change Password -->
      {#if !showChangePassword}
        <button 
          on:click={() => showChangePassword = true}
          class="w-full p-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-200 text-left group"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-medium">{t(currentLanguage, 'settings.changePassword')}</h3>
              <p class="text-white/60 text-sm">{t(currentLanguage, 'settings.changePasswordSubtitle')}</p>
            </div>
          </div>
        </button>
      {:else}
        <div class="p-4 bg-white/10 border border-white/20 rounded-xl">
          <h3 class="text-white font-medium mb-3">{t(currentLanguage, 'settings.changePassword')}</h3>
          <div class="space-y-3">
            <input
              type="password"
              bind:value={oldPassword}
              placeholder={t(currentLanguage, 'settings.currentPasswordPlaceholder')}
              class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200"
            />
            <input
              type="password"
              bind:value={newPassword}
              placeholder={t(currentLanguage, 'settings.newPasswordPlaceholder')}
              class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200"
            />
            <input
              type="password"
              bind:value={confirmPassword}
              placeholder={t(currentLanguage, 'settings.confirmNewPasswordPlaceholder')}
              class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200"
            />
            {#if passwordError}
              <p class="text-red-300 text-sm">{passwordError}</p>
            {/if}
            <div class="flex gap-2">
              <button 
                on:click={handleChangePassword}
                class="px-4 py-2 bg-[#0C6E78] hover:bg-[#0A5A63] text-white rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                {t(currentLanguage, 'settings.update')}
              </button>
              <button 
                on:click={resetPasswordForm}
                class="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                {t(currentLanguage, 'settings.cancel')}
              </button>
            </div>
          </div>
        </div>
      {/if}

      <!-- Encryption UI removed; answers are encrypted automatically. -->

      <!-- Delete All Data -->
      {#if deleteSuccess}
        <div class="p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-green-200 font-medium">{t(currentLanguage, 'settings.deleteSuccessTitle')}</h3>
              <p class="text-green-300/70 text-sm">{t(currentLanguage, 'settings.deleteSuccessBody')}</p>
            </div>
          </div>
        </div>
      {:else if !showDeleteConfirm}
        <button 
          on:click={() => showDeleteConfirm = true}
          class="w-full p-4 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-xl transition-all duration-200 text-left group"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-500/30 rounded-lg flex items-center justify-center group-hover:bg-red-500/40 transition-colors duration-200">
              <svg class="w-5 h-5 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-red-200 font-medium">{t(currentLanguage, 'settings.deleteAllData')}</h3>
              <p class="text-red-300/70 text-sm">{t(currentLanguage, 'settings.deleteAllDataSubtitle')}</p>
            </div>
          </div>
        </button>
      {:else}
        <div class="p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-red-500/30 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-red-200 font-medium">{t(currentLanguage, 'settings.deleteConfirmTitle')}</h3>
              <p class="text-red-300/70 text-sm">{t(currentLanguage, 'settings.deleteConfirmBody')}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button 
              on:click={handleDeleteAllData}
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              {t(currentLanguage, 'settings.deleteAllAction')}
            </button>
            <button 
              on:click={() => showDeleteConfirm = false}
              class="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors duration-200 text-sm"
            >
              {t(currentLanguage, 'settings.cancel')}
            </button>
          </div>
        </div>
      {/if}

      <!-- Delete Profile (Account) -->
      {#if deleteProfileSuccess}
        <div class="p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-500/30 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-red-200 font-medium">{t(currentLanguage, 'settings.deleteProfileSuccessTitle')}</h3>
              <p class="text-red-300/70 text-sm">{t(currentLanguage, 'settings.deleteProfileSuccessBody')}</p>
            </div>
          </div>
        </div>
        {#if typeof window !== 'undefined'}
          {@const autoCloseTimer = setTimeout(() => dispatch('close'), 2000)}
        {/if}
      {:else if !showDeleteProfileConfirm}
        <button 
          on:click={() => showDeleteProfileConfirm = true}
          class="w-full p-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-xl transition-all duration-200 text-left group"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-600/30 rounded-lg flex items-center justify-center group-hover:bg-red-600/40 transition-colors duration-200">
              <svg class="w-5 h-5 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-red-200 font-medium">{t(currentLanguage, 'settings.deleteProfile')}</h3>
              <p class="text-red-300/70 text-sm">{t(currentLanguage, 'settings.deleteProfileSubtitle')}</p>
            </div>
          </div>
        </button>
      {:else}
        <div class="p-4 bg-red-600/20 border border-red-500/30 rounded-xl">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-red-600/30 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div>
              {#if deleteProfileSuccess}
                <h3 class="text-green-200 font-medium">Account Deleted Successfully</h3>
                <p class="text-green-300/70 text-sm">Your account and data have been removed. Redirecting to login page...</p>
              {:else if isDeletingProfile}
                <h3 class="text-red-200 font-medium">Deleting Account...</h3>
                <p class="text-red-300/70 text-sm">Please wait while we delete your account and all data. You will be redirected to the login page shortly.</p>
              {:else}
                <h3 class="text-red-200 font-medium">{t(currentLanguage, 'settings.deleteConfirmTitle')}</h3>
                <p class="text-red-300/70 text-sm">{t(currentLanguage, 'settings.deleteConfirmBody')}</p>
              {/if}
            </div>
          </div>
          <div class="flex gap-2">
            <button 
              on:click={handleDeleteProfile}
              disabled={isDeletingProfile || deleteProfileSuccess}
              class="px-4 py-2 bg-red-700 hover:bg-red-800 disabled:bg-red-900 disabled:opacity-50 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex items-center gap-2"
            >
              {#if deleteProfileSuccess}
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Deleted
              {:else if isDeletingProfile}
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              {:else}
                {t(currentLanguage, 'settings.deleteProfileAction')}
              {/if}
            </button>
            <button 
              on:click={() => showDeleteProfileConfirm = false}
              disabled={isDeletingProfile}
              class="px-4 py-2 bg-white/10 hover:bg-white/15 disabled:bg-white/5 disabled:opacity-50 text-white rounded-lg transition-colors duration-200 text-sm"
            >
              {t(currentLanguage, 'settings.cancel')}
            </button>
          </div>
        </div>
      {/if}

      <!-- Logout -->
      <button 
        on:click={() => dispatch('logout')}
        class="w-full p-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-200 text-left group"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-white font-medium">{t(currentLanguage, 'settings.logout')}</h3>
            <p class="text-white/60 text-sm">{t(currentLanguage, 'settings.logoutSubtitle')}</p>
          </div>
        </div>
      </button>
    </div>
  </div>
</div>