import json
from django.http import JsonResponse  # type: ignore
from django.views.decorators.csrf import csrf_exempt  # type: ignore
from django.views.decorators.http import require_http_methods  # type: ignore
from .web3_utils import get_contract, w3

# Utility function to parse JSON body
def get_json_data(request):
    try:
        return json.loads(request.body)
    except json.JSONDecodeError:
        return None

# Endpoint to register a voter
@csrf_exempt
@require_http_methods(["POST"])
def register_voter(request):
    data = get_json_data(request)
    required_fields = ['voter_id', 'full_name', 'adhaar_card', 'username', 'password']
    if data is None or not all(field in data for field in required_fields):
        return JsonResponse({'status': 'error', 'message': 'Invalid input data'}, status=400)

    voter_id = int(data['voter_id'])
    full_name = data['full_name']
    adhaar_card = data['adhaar_card']
    username = data['username']
    password = data['password']

    contract = get_contract()
    try:
        tx_hash = contract.functions.registerVoter(voter_id, full_name, adhaar_card, username, password).transact({'from': w3.eth.accounts[0]})
        return JsonResponse({'status': 'success', 'tx_hash': tx_hash.hex()})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to add a candidate with a secret key
@csrf_exempt
@require_http_methods(["POST"])
def add_candidate(request):
    data = get_json_data(request)
    if data is None or 'name' not in data or 'secret_key' not in data:
        return JsonResponse({'status': 'error', 'message': 'Invalid input data'}, status=400)

    candidate_name = data['name']
    secret_key = data['secret_key']
    contract = get_contract()

    try:
        tx_hash = contract.functions.addCandidate(candidate_name, secret_key).transact({'from': w3.eth.accounts[0]})
        return JsonResponse({'status': 'success', 'tx_hash': tx_hash.hex()})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to remove a candidate with a secret key
@csrf_exempt
@require_http_methods(["POST"])
def remove_candidate(request):
    data = get_json_data(request)
    if data is None or 'candidate_id' not in data or 'secret_key' not in data:
        return JsonResponse({'status': 'error', 'message': 'Invalid input data'}, status=400)

    candidate_id = int(data['candidate_id'])
    secret_key = data['secret_key']
    contract = get_contract()

    try:
        tx_hash = contract.functions.removeCandidate(candidate_id, secret_key).transact({'from': w3.eth.accounts[0]})
        return JsonResponse({'status': 'success', 'tx_hash': tx_hash.hex()})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to vote for a candidate with voter credentials
@csrf_exempt
@require_http_methods(["POST"])
def vote(request):
    data = get_json_data(request)
    required_fields = ['voter_id', 'username', 'password', 'candidate_id']
    if data is None or not all(field in data for field in required_fields):
        return JsonResponse({'status': 'error', 'message': 'Invalid input data'}, status=400)

    voter_id = int(data['voter_id'])
    username = data['username']
    password = data['password']
    candidate_id = int(data['candidate_id'])

    contract = get_contract()

    try:
        tx_hash = contract.functions.vote(voter_id, username, password, candidate_id).transact({'from': w3.eth.accounts[0]})
        return JsonResponse({'status': 'success', 'tx_hash': tx_hash.hex()})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to get the vote count for a candidate
@csrf_exempt
def get_vote_count(request, candidate_id):
    contract = get_contract()
    try:
        vote_count = contract.functions.getVoteCount(candidate_id).call()
        return JsonResponse({'candidate_id': candidate_id, 'vote_count': vote_count})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to get the total number of candidates
@csrf_exempt
def get_candidates_count(request):
    contract = get_contract()
    try:
        candidates_count = contract.functions.getCandidatesCount().call()
        return JsonResponse({'candidates_count': candidates_count})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to get the total number of votes
@csrf_exempt
def get_total_votes(request):
    contract = get_contract()
    try:
        total_votes = contract.functions.getTotalVotes().call()
        return JsonResponse({'total_votes': total_votes})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# Endpoint to retrieve all candidates with their names and vote counts
@csrf_exempt
@require_http_methods(["GET"])
def get_candidates(request):
    contract = get_contract()

    try:
        candidates_count = contract.functions.getCandidatesCount().call()
        candidates_list = []

        for i in range(1, candidates_count + 1):
            try:
                candidate = contract.functions.getCandidate(i).call()
                if candidate[0]:
                    candidates_list.append({
                        'id': i,
                        'name': candidate[0],
                        'vote_count': candidate[1]
                    })
            except Exception:
                continue

        return JsonResponse({'status': 'success', 'candidates': candidates_list})

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)